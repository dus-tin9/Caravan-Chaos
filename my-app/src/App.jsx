import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import { DEFAULT_LEVEL_ID, routes } from '@/lib/routes'
import Level from './components/Level'
import MainMenu from './components/MainMenu'
import SettingsPage from './components/Settings'

function LevelRoute() {
  const { levelId } = useParams()
  const parsedLevelId = Number(levelId)
  const isValidLevelId = Number.isInteger(parsedLevelId) && parsedLevelId > 0

  if (!isValidLevelId) {
    return <Navigate to={routes.levelById(DEFAULT_LEVEL_ID)} replace />
  }

  return <Level key={parsedLevelId} levelId={parsedLevelId} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.main} replace />} />
      <Route path={routes.main} element={<MainMenu />} />
      <Route path={routes.settings} element={<SettingsPage />} />
      <Route
        path={routes.levelRoot}
        element={<Navigate to={routes.levelById(DEFAULT_LEVEL_ID)} replace />}
      />
      <Route path={`${routes.levelRoot}/:levelId`} element={<LevelRoute />} />
      <Route path="*" element={<Navigate to={routes.main} replace />} />
    </Routes>
  )
}
