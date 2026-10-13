import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { TrainersPage } from './components/pages/TrainersPage';
import { MembershipsPage } from './components/pages/MembershipsPage';
import { FacilitiesPage } from './components/pages/FacilitiesPage';
import { CustomerDashboardPage } from './components/pages/CustomerDashboardPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminDashboardPage } from './components/pages/AdminDashboardPage';
import { BookingModal } from './components/modals/BookingModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { LogWorkoutModal } from './components/modals/LogWorkoutModal';
import { NewClassModal } from './components/modals/NewClassModal';
import { CheckCircle2, AlertCircle, Info, Calendar, Dumbbell, User } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, setCurrentPage, modal, toast, openCheckoutModal } = useFitness();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'programs':
        return <ProgramsPage />;
      case 'trainers':
        return <TrainersPage />;
      case 'memberships':
        return <MembershipsPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'dashboard':
        return <CustomerDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f1f3f7] selection:bg-[#ff3278] selection:text-white pb-16 sm:pb-0">
      {/* Top Bar Header */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Navigation Bar (Compliant with <= 15% mobile sticky cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-t border-[#1e2333] px-3 py-2 flex items-center justify-around h-14">
        <button
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'home' ? 'text-[#ff3278] font-bold' : 'text-slate-400'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentPage('programs')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'programs' ? 'text-[#ff3278] font-bold' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Workouts</span>
        </button>

        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'dashboard' ? 'text-[#ff3278] font-bold' : 'text-slate-400'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => openCheckoutModal()}
          className="px-3 py-1.5 bg-gradient-to-r from-[#ff3278] to-[#ff5e3a] text-white text-[11px] font-bold rounded-lg shadow-sm"
        >
          Cult Pass
        </button>
      </div>

      {/* Global Modals */}
      {modal.type === 'booking' && modal.data && (
        <BookingModal classItem={modal.data} />
      )}
      {modal.type === 'checkout' && (
        <CheckoutModal initialPlan={modal.data} />
      )}
      {modal.type === 'logWorkout' && (
        <LogWorkoutModal />
      )}
      {modal.type === 'newClass' && (
        <NewClassModal />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium max-w-sm ${
              toast.type === 'success'
                ? 'bg-[#121922] border-emerald-500/40 text-emerald-300'
                : toast.type === 'error'
                ? 'bg-[#201419] border-rose-500/40 text-rose-300'
                : 'bg-[#141824] border-cyan-500/40 text-cyan-300'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-cyan-400" />}
            <span className="leading-snug">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <FitnessProvider>
      <MainContent />
    </FitnessProvider>
  );
}
