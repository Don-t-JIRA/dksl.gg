import { useEffect } from 'react';
import countAtom from '../jotai/testCount';
import { useAtomValue } from 'jotai';
import Swal from 'sweetalert2';

const TestComponent = () => {
  const count = useAtomValue(countAtom);
  useEffect(() => {
    if (count > 9) {
      Swal.fire(`${count} COunt`, 'Testing', 'success');
    }
  }, [count])
  return (
    <div>{count}</div>
  )
}

export default TestComponent;