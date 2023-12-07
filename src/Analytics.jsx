import React from 'react'

function Analytics() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative'}}>
      <iframe 
        title="Report Section" 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
        src="https://app.powerbi.com/view?r=eyJrIjoiMmM4OTkyNmItNzA5Ni00YWVmLThhMDAtZTVmNDY0NWE2MDgxIiwidCI6IjBjYzZlMWZjLWQ4NDgtNDFkZi05NDMzLTY4MzE3NGM5MmIzMSIsImMiOjEwfQ%3D%3D&embedImagePlaceholder=true" 
        frameborder="0" 
        allowFullScreen="true"
      />
    </div>
  )
}

export default Analytics
