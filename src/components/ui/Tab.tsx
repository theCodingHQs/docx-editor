import React, { useState } from 'react'
import { ValuationForm } from '../valuations/ValuationForm';
import EarlierValuationInfoForm from '../valuations/EarlierValuationInfoForm';
import Example from './Tabs';

interface TabProps{
    tabContentArray:string[];
}
const Tab = () => {
    const [open, setOpen] = useState("home");

    const handleTabOpen = (tabCategory:string) => {
        console.log("tabCategory",tabCategory)
        setOpen(tabCategory);
    };
    const [tabContentArray,setTabContentArray]=useState([{id:1,tabName:"Home"}, {id:2,tabName:"About Us"}, {id:3,tabName:"Our Team"},{id:4,tabName:"Company Details"}])
    const[tabContentComponent,setTabContentComponent]=useState([{id:1,tabName:<EarlierValuationInfoForm/>}, {id:2,tabName:"About Us"}, {id:3,tabName:"Our Team"},{id:4,tabName:"Company Details"}])
    return (
        <>
        <Example />
        <section className=" flex dark:bg-dark border-none">
          <div className="container  bg-blue-500">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-2">
                <div className=" w-full">
                  <div className="flex flex-col flex-wrap justify-evenly rounded-lg  px-4  dark:border-dark-3 sm:flex-row">
                    {
                         tabContentArray.map((content)=>{
                               return(
                                <a
                                onClick={() => handleTabOpen(`${content}`)}
                                className={ `w-60 flex justify-center hover:bg-white hover:cursor-pointer rounded-md px-4 py-2 text-sm font-medium md:text-base lg:px-6 ${
                                  open === `${content}`
                                    ? "bg-primary "
                                    : "text-body-color hover:bg-primary h-10 hover:rounded-t-xl mb-0"
                                }`}
                              >
                                {/* {content} */}
                              </a>
                               )
                         })
                    }
                  </div>
                  </div>
                 </div>
                 
            </div>
          </div>
        </section>
        {
           tabContentComponent.map((content)=> {
            return
            (
              <></>
            )
           })
        }
        
      </>
    )
}

export default Tab
