import * as express from 'express'

async function handleAddressRoute(req, res) {
  try {
    const response = JSON.stringify({message: 'Keeping alive for another 20sec'})
    req.session.cookie.maxAge = 20 * 1000
    res.status(200).send(response)
  } catch (e) {
    const errorMessage = JSON.stringify({message: 'Something went wrong with the heart beat'});
    res.status(500).send(errorMessage)
  }

}

export const router = express.Router({ mergeParams: true })
router.get('', handleAddressRoute)
export default router
