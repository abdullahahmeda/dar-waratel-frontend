import Head from 'next/head'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import withAuth from '../../hoc/withAuth'

function Dashboard () {
  return (
    <DashboardLayout>
      <div>
        <Head>
          <title>دار ورتل | لوحة التحكم</title>
        </Head>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(Dashboard)
