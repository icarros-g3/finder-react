import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Car } from '../pages/Car'
import { Catalog } from '../pages/Catalog'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cars" element={<Catalog />} />
      <Route path="cars/:id" exact element={<Car />} />
    </Routes>
  )
}
