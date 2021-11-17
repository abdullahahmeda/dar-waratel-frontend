import Head from 'next/head'
import MasterLayout from '../components/layouts/MasterLayout'

export default function Home () {
  return (
    <MasterLayout>
      <div>
        <Head>
          <title>دار ورتل | الصفحة الرئيسية</title>
        </Head>
      </div>
    </MasterLayout>
  )
}
