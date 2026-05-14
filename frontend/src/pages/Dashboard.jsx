import { useState, useEffect } from 'react'
import { LuRefreshCw, LuAlertCircle } from 'react-icons/lu'
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
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    
    // ✅ UNCOMMENTED: Fetch data from backend
    getDashboard()
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data)
        } else {
          setData(null)
        }
      })
      .catch((err) => {
        console.error('Error fetching dashboard:', err)
        setError(err.message || 'Gagal memuat dashboard')
        setData(null)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  return { data, loading, error, refetch: fetchData }
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

// ========== ERROR STATE COMPONENT ==========
function ErrorState({ error, onRetry }) {
  return (
    <div className='mt-6 flex items-start gap-4 p-6 bg-red-50 border-2 border-red-200 rounded-3xl'>
      <LuAlertCircle size={24} className='text-red-500 flex-shrink-0 mt-0.5' />
      <div className='flex-1'>
        <h3 className='font-semibold text-red-900 mb-1'>Gagal memuat dashboard</h3>
        <p className='text-sm text-red-700 mb-4'>{error}</p>
        <button
          onClick={onRetry}
          className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium text-sm'
        >
          <LuRefreshCw size={16} />
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

function Dashboard() {
  const { data, loading, error, refetch } = useDashboardData()

  return (
    <MainLayout title='Dashboard Kesehatan'>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          {/* Error Alert */}
          {error && (
            <ErrorState error={error} onRetry={refetch} />
          )}

          {/* Greeting */}
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
            <MetricCard 
              icon='brain' 
              title='Stress Level' 
              value={data?.stressLevel ?? '-'} 
              desc={data ? 'Lebih baik dari kemarin' : 'Belum ada data'} 
              trend='up' 
              empty={!data} 
            />
            <MetricCard 
              icon='heart' 
              title='Heart Rate' 
              value={data?.heartRate ?? '-'} 
              desc={data ? 'Normal' : 'Belum ada data'} 
              trend='up' 
              empty={!data} 
            />
            <MetricCard 
              icon='mood' 
              title='Mood' 
              value={data?.mood ?? '-'} 
              desc={data ? 'Energi meningkat' : 'Belum ada data'} 
              trend='up' 
              empty={!data} 
            />
            <MetricCard 
              icon='water' 
              title='Water Intake' 
              value={data?.waterIntake ?? '-'} 
              desc={data ? 'Target tercapai' : 'Belum ada data'} 
              trend='up' 
              empty={!data} 
            />
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
