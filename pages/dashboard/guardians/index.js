import DashboardLayout from '../../../components/layouts/DashboardLayout'
import withAuth from '../../../hoc/withAuth'
import Head from 'next/head'
import Container from '@mui/material/Container'
import DataTable from '../../../components/DataTable'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useDialog } from '../../../libs/my-dialog'
import { useSnackbar } from 'notistack'
import useGuardians from '../../../hooks/useGuardians'
import { useMutation, useQueryClient } from 'react-query'
import { deleteGuardian } from '../../../utils/api'

const columns = [
  {
    accessor: 'name',
    label: 'الإسم'
  },
  {
    accessor: 'username',
    label: 'إسم المستخدم'
  },
  {
    accessor: 'phone',
    label: 'رقم الهاتف'
  }
]

function GuardiansIndex () {
  const {
    error: guardiansError,
    isLoading: guardiansLoading,
    data: guardiansData
  } = useGuardians()

  const queryClient = useQueryClient()

  const deleteGuardianMutation = useMutation(id => deleteGuardian(id), {
    onMutate: async id => {
      await queryClient.cancelQueries('guardians')
      const oldGuardiansData = queryClient.getQueryData('guardians')
      const newGuardiansData = { ...oldGuardiansData }
      newGuardiansData.results = oldGuardiansData.results.filter(
        guardian => guardian.id !== id
      )
      newGuardiansData.total--
      queryClient.setQueryData('guardians', newGuardiansData)

      return { oldGuardiansData }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData('guardians', context.oldGuardiansData)
      enqueueSnackbar(`فشل حذف ولي الأمر رقم ${id}`, { variant: 'error' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries('guardians')
    }
  })
  const { enqueueSnackbar } = useSnackbar()
  const { openModal, closeModal } = useDialog()

  const confirmDeleteRow = (row, key) => {
    openModal({
      title: 'حذف ولي أمر',
      text: (
        <div>
          هل أنت متأكد من رغبتك في حذف ولي الأمر{' '}
          <Typography sx={{ fontWeight: 'bold' }}>{row.name}؟</Typography>
        </div>
      ),
      actions: (
        <>
          <Button onClick={closeModal}>تراجع</Button>
          <Button onClick={() => deleteRow(row, key)}>حذف</Button>
        </>
      )
    })
  }

  const deleteRow = (row, key) => {
    closeModal()
    deleteGuardianMutation.mutate(row.id)
  }

  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | أولياء الأمور</title>
        </Head>
        <Container sx={{ my: 2 }}>
          <Typography variant='h3' sx={{ mb: 3 }}>
            أولياء الأمور
          </Typography>
          <Link href='/dashboard/guardians/create'>
            <Button component='a' variant='contained' sx={{ mb: 1 }}>
              إضافة ولي أمر
            </Button>
          </Link>
          {!guardiansLoading && (
            <DataTable
              data={guardiansData.results}
              columns={columns}
              title={
                <Typography variant='h6'>
                  أولياء الأمور
                  {guardiansLoading && (
                    <CircularProgress
                      size={24}
                      sx={{ marginLeft: 15, position: 'relative', top: 4 }}
                    />
                  )}
                </Typography>
              }
              pagination
              actions={(row, key) => (
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => confirmDeleteRow(row, key)}
                >
                  حذف
                </Button>
              )}
            />
          )}
        </Container>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(GuardiansIndex)
