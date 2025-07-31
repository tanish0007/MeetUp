import { useThemeStore } from '../store/useThemeStore'

const HomePage = () => {
  const {theme, setTheme} = useThemeStore();

  return (
    <div>
      HomePage
    </div>
  )
}

export default HomePage
