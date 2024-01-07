import React from 'react'

function About() {
  return (
    <div className=''>
        <div className='container  d-flex justify-content-center align-items-center '>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-lg-6 col-md-6 p-lg-3 p-md-3 p-0   order-lg-1 order-2'>
                    <p className='p-0 title' style={{fontSize: '56px', fontWeight: '600', color: 'black', lineHeight: '1'}}> Safety<span style={{color:'#001BFF'}}>Pin</span> </p>
                    <p style={{fontWeight: '300', fontSize: '14px'}} className='desc'>A Web Application for Recommending Safe Routes and Heatmap Visualization for Enhancing Citizen Safety Against Crimes</p>
                    <div className='d-flex  gap-2 flex-lg-row flex-md-row flex-sm-row flex-column'>
                        <div>
                            <p style={{fontWeight: '300', fontSize: '14px'}} className='px-3 py-2 m-0 btn btn-outline-primary rounded-5 desc'>Dijkstra's Algorithm</p>
                        </div>
                        <div>
                            <p style={{fontWeight: '300', fontSize: '14px'}} className='px-3 py-2 m-0 btn btn-outline-primary rounded-5 desc'>KDE Algorithm</p>
                        </div>
                    </div>

                </div>

                <div className='col-lg-6 col-md-6 p-lg-3 p-md-3 p-0  order-lg-2 order-1 d-flex justify-content-center'>
                    <img src="prototype.png" style={{width: '100%'}} alt="" />
                </div>

            </div>
        </div>

        <div className='container  d-flex justify-content-center align-items-center mt-5 mb-5'>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-12 p-lg-3 p-md-3 p-0   order-lg-1 order-2'>
                    <p className='p-0 title' style={{fontSize: '56px', fontWeight: '600', color: 'black', lineHeight: '1'}}> Abstract </p>
                    <p style={{fontWeight: '300', fontSize: '14px'}} className='desc'>With the <b>increasing incidence of criminal activities</b> , it has become imperative to
                        prioritize the citizen’s safety. Despite safety being a primary concern, individuals often
                        have <b>limited access to information regarding the safety levels</b> of areas within a city.
                        Current navigation systems focus on identifying the shortest routes, which may not
                        always be the safest option. Research conducted over the past 25 years reveals that
                        <b> criminal activities are not evenly dispersed across urban landscapes.</b> Rather, <b> they tend to
                        cluster in particular locations, often termed as “hot spots”.</b> These hot spots are
                        responsible for nearly half of all criminal occurrences. This underscores the significance
                        of a system capable of visually representing and analyzing these hot spots. <br /> <br /> This project
                        aims to address this issue by developing an application that integrates <b>Dijkstra’s algorithm
                        to recommend safe routes and Kernel Density Estimation (KDE) algorithm
                        for visualizing crime patterns </b>  at various locations using heatmaps. The project also aims
                        to support the efforts of various stakeholders, including <b>law enforcement, local
                        government units, business/entrepreneurship, and tourism industries by facilitating
                        evidence-based decision-making on their practices.</b>  By increasing awareness about
                        safety conditions in different areas, this project could help in crime prevention or
                        reduction, thereby enhancing overall citizen safety.
                    </p>
                </div>


            </div>
        </div>

        <div className='container  d-flex justify-content-center align-items-center mt-5'>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-lg-12 col-md-12 p-lg-3 p-md-3 p-0 '>
                    <p className='p-0 title' style={{fontSize: '56px', fontWeight: '600', color: 'black', lineHeight: '1'}}> Authors </p>
                    <p style={{fontWeight: '300', fontSize: '14px'}} className='desc'>SafetyPin is developed by B.S. in Computer Science students at West Visayas State University for their Undergraduate Thesis.  </p>
                    <div className='d-flex  gap-2 flex-lg-row flex-md-row flex-sm-row flex-column'>
                        <div>
                            <p style={{fontWeight: '300', fontSize: '14px'}} className='px-3 py-2 m-0 btn btn-outline-primary rounded-5 desc'>People behind SafetyPin</p>
                        </div>
                    </div>
                </div>

                <div className='col-lg-12 col-md-12 p-lg-3 p-md-3 row p-0  d-flex justify-content-center '>

                    <div className='col-lg-3 col-md-3 col-6 p-3 '>
                        <img src="jn.png" className='rounded-3 border border-primary' style={{objectFit: 'cover', width: '100%'}} alt="" />
                        <p className='py-2 text-center desc' style={{ color: 'black', fontWeight: '500', fontSize: '14px'}}> Jeno D. Bellido</p>
                    </div>

                    <div className='col-lg-3 col-md-3 col-6 p-3 '>
                        <img src="rey.png" className='rounded-3 border border-primary' style={{objectFit: 'cover', width: '100%'}} alt="" />
                        <p className='py-2 text-center desc' style={{ color: 'black', fontWeight: '500', fontSize: '14px'}}> Rey Anne Destua</p>
                    </div>

                    <div className='col-lg-3 col-md-3 col-6 p-3 '>
                        <img src="ariane.png" className='rounded-3 border border-primary' style={{objectFit: 'cover', width: '100%'}} alt="" />
                        <p className='py-2 text-center desc' style={{ color: 'black', fontWeight: '500', fontSize: '14px'}}> Ariane Marie Lavilla</p>
                    </div>


                    <div className='col-lg-3 col-md-3 col-6 p-3'>
                        <img src="cai.png" className='rounded-3 border border-primary' style={{objectFit: 'cover', width: '100%'}} alt="" />
                        <p className='py-2 text-center desc' style={{color: 'black', fontWeight: '500', fontSize: '14px'}}> John Cairo Minerva</p>
                    </div>

                </div>

            </div>
        </div>

        <div className='container  d-flex justify-content-center align-items-center '>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-12 p-lg-3 p-md-3 p-0   order-lg-1 order-2'>

                    <div className='d-flex  gap-2 flex-lg-row flex-md-row flex-sm-row flex-column'>
                        <div>
                            <p style={{fontWeight: '300', fontSize: '14px'}} className='px-3 py-2 m-0 btn btn-outline-primary rounded-5 desc'>Acknowledgement</p>
                        </div>
                    </div>

                    <p style={{fontWeight: '300', fontSize: '14px'}} className='desc'> 
                    <br />
                        <b>Dr. Frank I. Eijorde</b> - Thesis Adviser
                        <br />
                        <b>Mr. John Christopher Mateo</b> - Thesis Co-adviser
                        <br />
                        <b>PCOL. Ariane Arostique</b> - Police in-charged for data collection.

                    </p>
                </div>


            </div>
        </div>

        <div className='container  d-flex justify-content-center align-items-center  '>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-12 p-lg-3 p-md-3 p-0   order-lg-1 order-2'>
                    <div className='d-flex  gap-2 flex-lg-row flex-md-row flex-sm-row flex-column'>
                        <div>
                            <p style={{fontWeight: '300', fontSize: '14px'}} className='px-3 py-2 m-0 btn btn-outline-primary rounded-5 desc'> Authorship Acknowledgment </p>
                        </div>
                    </div>

                    <p style={{fontWeight: '300', fontSize: '14px'}} className='desc'> 
                    <br />
                    This segment is excerpted from an <b>undergraduate research paper</b>  authored by 
                    <b> Bellido, Destua, Lavilla, and Minerva</b>  at <b>West Visayas State University - College of Information and Communications Technology. </b>  
                     All rights are reserved.
                    </p>
                </div>


            </div>
        </div>

        <div className='container  d-flex justify-content-center align-items-center mb-5'>
            <div className='col-12  row d-flex justify-content-center align-items-center'>
                
                <div className=' col-5 p-lg-3 p-md-3 p-0   order-lg-1 order-2'>
                    <img src="school-logo.png" style={{width: '100%'}} alt="" />
                </div>


            </div>
        </div>



    </div>
  )
}

export default About