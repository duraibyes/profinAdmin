const Pagination = ({links}) => {
  return (
    <ul className="flex items-center -space-x-px h-10 text-base">
        {links.map((link, i) => (
            <li key={i}>
                <a href={link.url} className={`flex items-center justify-center px-4 h-10 leading-light text-gray-500 bg-white border border-gray-300 hover:bg-gray-1 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-800
                 ${link.active ? '': 'bg-slate-200'}`}>
                    <div dangerouslySetInnerHTML={{__html:link.label}}></div>
                </a>

            </li>
        ))}
    </ul>
  )
}

export default Pagination