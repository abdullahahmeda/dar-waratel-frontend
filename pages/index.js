import Head from 'next/head'
import { useSelector } from 'react-redux'
import GuardianHome from '../components/GuardianHome'
import MasterLayout from '../components/layouts/MasterLayout'

export default function Home () {
  const authedUser = useSelector(state => state.authedUser)
  return (
    <MasterLayout>
      <div>
        <Head>
          <title>دار ورتل | الصفحة الرئيسية</title>
        </Head>
      </div>
      {authedUser ? (
        <>{authedUser.type === 'guardian' && <GuardianHome />}</>
      ) : null}
      {}
    </MasterLayout>
  )
}
