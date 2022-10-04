
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
export const alertFailed = (message) => {
  MySwal.fire(
    'Failed',
    message,
    'error',
  );
}