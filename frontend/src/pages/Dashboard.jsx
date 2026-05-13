import MainLayout from '../layouts/MainLayout'
import ActivityCard from '../components/ActivityCard'
import HealthChart from '../components/HealthChart'
import MetricCard from '../components/MetricCard'
import SleepCard from '../components/SleepCard'
import RecommendationCard from '../components/RecommendationCard'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}

function Dashboard() {
  return (
    <MainLayout title='Dashboard Kesehatan'>
      <div>
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>
            {getGreeting()}, Nova 👋
          </h1>
          <p className='text-slate-400 mt-1.5 text-sm'>
            Pantau kesehatan mental dan tidur harianmu.
          </p>
        </div>

        {/* Metric Cards — 2 cols mobile, 4 cols desktop */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5'>
          <MetricCard icon='brain' title='Stress Level' value='Moderate' desc='Lebih baik dari kemarin' trend='up' />
          <MetricCard icon='heart' title='Heart Rate' value='72 BPM' desc='Normal' trend='up' />
          <MetricCard icon='mood' title='Mood' value='Happy' desc='Energi meningkat' trend='up' />
          <MetricCard icon='water' title='Water Intake' value='2L' desc='Target tercapai' trend='up' />
        </div>

        {/* Chart + Sleep — full mobile, 3 cols desktop */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-4 md:mt-5'>
          <div className='md:col-span-2'>
            <HealthChart />
          </div>
          <SleepCard />
        </div>

        {/* Recommendation + Activity — 1 col mobile, 2 cols desktop */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-4 md:mt-5'>
          <RecommendationCard />
          <ActivityCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
