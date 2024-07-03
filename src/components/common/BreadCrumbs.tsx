import Link from 'next/link'
import { FiChevronRight } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";
interface PropsType {
   data: Array<any>;
   title?: string;
}
const BreadCrumbs: React.FC<PropsType> = ({ data, title }) => {
   const renderBreadCrumbs = () => {
      return data?.map((item, index) => {
         const Wrapper = item.link ? Link : 'div'
         const isLastItem = data.length - 1 === index
         return (
            <li key={index} className='flex items-center'>
               <RxSlash size='14' className='mx-1' />
               <span className='text-sm leading-none' {...(item.link ? { to: item.link } : {})}>{item.title}</span>
            </li>
         )
      })
   }

   return (
      <div className='mb-3'>
         <div className='flex items-center'>
            {title ? <div className="text-xl font-medium me-4">{title}</div> : ''}
            <ul className='flex items-center'>
               <li className=''>
                  <Link href='/' className='text-sm leading-none text-indigo-500'>Home</Link>
               </li>
               {renderBreadCrumbs()}
            </ul>
         </div>
      </div>
   )
}
export default BreadCrumbs