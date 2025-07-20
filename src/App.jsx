import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ paddingBottom: '60px' }}>
      <Header />
      <UserProfile name="John Doe" age={30} bio="Developer" />
      <MainContent />
      <Footer />
    </div>
  );
}
export default App;
