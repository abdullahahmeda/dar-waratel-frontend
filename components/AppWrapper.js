import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { getInitialData } from '../actions/shared'

function AppWrapper ({ loading, children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getInitialData())
  }, [])
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {!loading && children}
    </>
  )
}

function mapStateToProps ({ loading }) {
  return {
    loading
  }
}

export default connect(mapStateToProps)(AppWrapper)
