import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import ActivityCard from '../components/ActivityCard'
import HealthChart from '../components/HealthChart'
import MetricCard from '../components/MetricCard'
import SleepCard from '../components/SleepCard'
import RecommendationCard from '../components/RecommendationCard'
import SkeletonCard, { SkeletonChart, SkeletonBlock } from '../components/SkeletonCard'
import { getDashboard } from '../api/dashboard'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}

function useDashboardData() {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    // TODO: uncomment ketika backend sudah siap
    // getDashboard()
    //   .then((res) => setData(res.data.data))
    //   .catch(() => setData(null))
    //   .finally(() => setLoading(false))

    // Simulasi sementara — hapus setTimeout ini ketika backend sudah siap
    setTimeout(() => {
      setData(null)
      setLoading(false)
    }, 1500)
  }

  useEffect(() => { fetchData() }, [])

  return { data, loading, refetch: fetchData }
}

function DashboardSkeleton() {
  return (
    <div>
      <div className='mb-6'>
        <div className='w-56 h-7 bg-slate-100 rounded-full animate-pulse mb-2' />
        <div className='w-40 h-4 bg-slate-100 rounded-full animate-pulse' />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-4 md:mt-5'>
        <SkeletonChart className='md:col-span-2' />
        <SkeletonBlock />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-4 md:mt-5'>
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
    </div>
  )
}

function Dashboard() {
  const { data, loading } = useDashboardData()

  return (
    <MainLayout title='Dashboard Kesehatan'>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <div className='mb-6'>
            <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>
              {getGreeting()}, Nova 👋
            </h1>
            <p className='text-slate-400 mt-1.5 text-sm'>
              Pantau kesehatan mental dan tidur harianmu.
            </p>
          </div>

          {/* Metric Cards — tampil dengan '-' jika belum ada data */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
            <MetricCard icon='brain' title='Stress Level' value={data?.stressLevel ?? '-'} desc={data ? 'Lebih baik dari kemarin' : 'Belum ada data'} trend='up' empty={!data} />
            <MetricCard icon='heart' title='Heart Rate' value={data?.heartRate ?? '-'} desc={data ? 'Normal' : 'Belum ada data'} trend='up' empty={!data} />
            <MetricCard icon='mood' title='Mood' value={data?.mood ?? '-'} desc={data ? 'Energi meningkat' : 'Belum ada data'} trend='up' empty={!data} />
            <MetricCard icon='water' title='Water Intake' value={data?.waterIntake ?? '-'} desc={data ? 'Target tercapai' : 'Belum ada data'} trend='up' empty={!data} />
          </div>

          {/* Chart + Sleep */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-4 md:mt-5'>
            <div className='md:col-span-2'>
              <HealthChart empty={!data} />
            </div>
            <SleepCard empty={!data} />
          </div>

          {/* Recommendation + Activity */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-4 md:mt-5'>
            <RecommendationCard empty={!data} />
            <ActivityCard empty={!data} />
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Dashboard
