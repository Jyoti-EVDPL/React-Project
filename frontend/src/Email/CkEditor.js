import React, { useState } from 'react'
import {CkEditor} from '@ckeditor/ckeditor5-react'

function CkEditor() {
    const [data,setData] = useState('');
  return (
    <div>
        <CkEditor editor={ClassicEditor} />
        <div>

        </div>
    </div>
  )
}

export default CkEditor