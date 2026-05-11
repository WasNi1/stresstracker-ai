import MainLayout from '../layouts/MainLayout'
import ActivityCard from '../components/ActivityCard'
import HealthChart from '../components/HealthChart'
import MetricCard from '../components/MetricCard'
import SleepCard from '../components/SleepCard'
import RecommendationCard from '../components/RecommendationCard'

function Dashboard() {
  return (
    <MainLayout title='Dashboard Kesehatan'>
      <div>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-slate-800'>
            Selamat Pagi 👋
          </h1>

          <p className='text-slate-400 mt-2'>
            Pantau kesehatan mental dan tidur harianmu.
          </p>
        </div>

        <div className='grid grid-cols-4 gap-6'>
          <MetricCard
            title='Stress Level'
            value='Moderate'
            desc='Lebih baik dari kemarin'
          />

          <MetricCard
            title='Heart Rate'
            value='72 BPM'
            desc='Normal'
          />

          <MetricCard
            title='Mood'
            value='Happy'
            desc='Energi meningkat'
          />

          <MetricCard
            title='Water Intake'
            value='2L'
            desc='Target tercapai'
          />
        </div>

        <div className='grid grid-cols-3 gap-6 mt-6'>
          <div className='col-span-2'>
            <HealthChart />
          </div>

          <SleepCard />
        </div>

        <div className='grid grid-cols-2 gap-6 mt-6'>
          <RecommendationCard />

          <ActivityCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard