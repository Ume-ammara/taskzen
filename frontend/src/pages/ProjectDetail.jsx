import { useProjectStore } from '@/store/projectStore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProjectDetail = () => {
    const {getProject, project} = useProjectStore()
    const {projectId} = useParams()

    useEffect(()=>{
        if(projectId){
            getProject(projectId)
        }
    },[projectId , getProject])

    if(!project) return <div>Loading .....</div>

  return (
    <div >
    
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="mt-2 text-gray-600">{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectDetail
