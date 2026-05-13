import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import ActivityCard from '../components/ActivityCard'
import HealthChart from '../components/HealthChart'
import MetricCard from '../components/MetricCard'
import SleepCard from '../components/SleepCard'
import RecommendationCard from '../components/RecommendationCard'
import SkeletonCard, { SkeletonChart, SkeletonBlock } from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}

// Simulasi fetch — nanti diganti dengan API call sesungguhnya
// Ganti nilai: null = belum ada data, {} = ada data
function useDashboardData() {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    setTimeout(() => {
      // TODO: ganti dengan fetch('/api/dashboard') ketika backend sudah siap
      // Contoh kondisi:
      // setData(null)   → tampil empty state
      // setData({...})  → tampil data
      setData({
        stressLevel: 'Moderate',
        heartRate: '72 BPM',
        mood: 'Happy',
        waterIntake: '2L',
      })
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
  const { data, loading, refetch } = useDashboardData()

  return (
    <MainLayout title='Dashboard Kesehatan'>
      {loading ? (
        <DashboardSkeleton />
      ) : !data ? (
        <EmptyState onRetry={refetch} />
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

          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
            <MetricCard icon='brain' title='Stress Level' value={data.stressLevel} desc='Lebih baik dari kemarin' trend='up' />
            <MetricCard icon='heart' title='Heart Rate' value={data.heartRate} desc='Normal' trend='up' />
            <MetricCard icon='mood' title='Mood' value={data.mood} desc='Energi meningkat' trend='up' />
            <MetricCard icon='water' title='Water Intake' value={data.waterIntake} desc='Target tercapai' trend='up' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-4 md:mt-5'>
            <div className='md:col-span-2'>
              <HealthChart />
            </div>
            <SleepCard />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-4 md:mt-5'>
            <RecommendationCard />
            <ActivityCard />
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Dashboard
