import io from 'socket.io-client'
import store, {fetchWineList} from './store/wine'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('update-wines', () => {
    store.dispatch(fetchWineList())
  })
})

export default socket
