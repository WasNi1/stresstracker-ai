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
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-800'>
            {getGreeting()}, Nova 👋
          </h1>
          <p className='text-slate-400 mt-1.5 text-sm'>
            Pantau kesehatan mental dan tidur harianmu.
          </p>
        </div>

        <div className='grid grid-cols-4 gap-5'>
          <MetricCard icon='brain' title='Stress Level' value='Moderate' desc='Lebih baik dari kemarin' trend='up' />
          <MetricCard icon='heart' title='Heart Rate' value='72 BPM' desc='Normal' trend='up' />
          <MetricCard icon='mood' title='Mood' value='Happy' desc='Energi meningkat' trend='up' />
          <MetricCard icon='water' title='Water Intake' value='2L' desc='Target tercapai' trend='up' />
        </div>

        <div className='grid grid-cols-3 gap-5 mt-5'>
          <div className='col-span-2'>
            <HealthChart />
          </div>
          <SleepCard />
        </div>

        <div className='grid grid-cols-2 gap-5 mt-5'>
          <RecommendationCard />
          <ActivityCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
