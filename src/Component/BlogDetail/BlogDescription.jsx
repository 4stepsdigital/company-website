// import React from "react";

// import Image from "next/image";
// import SuggestedBlog from "./SuggestedBlog";
// import { Link as ScrollLink } from "react-scroll";
// import BlogSideForm from "./BlogSideForm";
// const BlogDescription = ({ blogPackageData, filterSuggestedBlogData }) => {
//   return (
//     <div>
//       {/* Blog BlogDescription section start*/}
//       <div className="container-wrapper py-9">
//         <div className="  grid grid-cols-1  xl:grid-cols-[2fr,0.8fr]">
//           <div className=" bg-white shadow-md px-4 py-4 ">
//             <div id="ItinerarySubSection" className="md:text-base text-sm">
//               <p
//                 dangerouslySetInnerHTML={{
//                   __html: blogPackageData?.contentsummary,
//                 }}
//               ></p>
//             </div>
//             {blogPackageData?.blogQuestions?.map((item, i) => (
//               <div key={i} className="pt-3" id={`${item?._id}`}>
//                 <h3 className=" md:text-2xl text-lg font-semibold mb-2">
//                   {item?.title}
//                 </h3>
//                 <p className="text-base  leading-relaxed">
//                   <p
//                     dangerouslySetInnerHTML={{ __html: item?.information }}
//                   ></p>
//                 </p>
//                 {item?.blogSubQuestion?.questions?.length > 0 &&
//                   item?.blogSubQuestion?.questions?.map((item1, k) => (
//                     <div key={k} className="pt-7" id={`${item1?._id}st${k}`}>
//                       <h3 className="md:text-xl text-base  font-semibold mb-2">
//                         {k + 1}
//                         {"."} {item1?.title}
//                       </h3>
//                       <p className="text-base leading-relaxed">
//                         <p
//                           dangerouslySetInnerHTML={{
//                             __html: item1?.information,
//                           }}
//                         ></p>
//                       </p>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>
//           {/* for sider section  */}
//           <div className="px-6  test-base">
//             <div className="sticky top-0 z-10">
//               <BlogSideForm />

//               {/* content side bar subquestion and table content */}
//               <p className=" text-xl pb-6 font-semibold "> Table of Content </p>
//               <div className=" overflow-y-scroll h-[450px]">
//                 <table className="min-w-full table-auto border-collapse">
//                   <tbody>
//                     {blogPackageData?.blogQuestions?.map((item, i) => (
//                       <React.Fragment key={i}>
//                         <tr className="border-b">
//                           <td className="px-4 py-2 text-base  cursor-pointer  font-semibold">
//                             <ScrollLink
//                               to={`${item?._id}`}
//                               spy={true}
//                               smooth={true}
//                               offset={-100}
//                               duration={500}
//                             >
//                               {item?.title}
//                             </ScrollLink>
//                           </td>
//                         </tr>
//                         {item?.blogSubQuestion?.questions?.map((item1, k) => (
//                           <tr key={k} className="border-b">
//                             <td className="px-4 py-2 ml-6 text-sm font-normal">
//                               <ScrollLink
//                                 to={`${item1?._id}st${k}`}
//                                 spy={true}
//                                 smooth={true}
//                                 offset={-100}
//                                 duration={500}
//                               >
//                                 <p className="hover:cursor-pointer hover:text-primary">
//                                   {k + 1}- {item1?.title}
//                                 </p>
//                               </ScrollLink>
//                             </td>
//                           </tr>
//                         ))}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*  Suggested Blog here*/}
//       <div>
//         <SuggestedBlog filterSuggestedBlogData={filterSuggestedBlogData} />
//       </div>
//       {/* Blog BlogDescription section end*/}
//     </div>
//   );
// };

// export default BlogDescription;

import React from "react";

import SuggestedBlog from "./SuggestedBlog";
import { Link as ScrollLink } from "react-scroll";
import BlogSideForm from "./BlogSideForm";

const BlogDescription = ({ blogPackageData, filterSuggestedBlogData }) => {
  return (
    <div>
      {/* Blog Description section start */}
      <div className="container-wrapper py-9">
        <div className="grid grid-cols-1 xl:grid-cols-[2fr,0.8fr] md:grid-flow-cols-[2fr,0.5fr]">
          {/* Table of Content for mobile */}
          <div className="block xl:hidden bg-white shadow-md px-4 py-4 mb-6">
            <p className="text-xl pb-4 font-semibold">Table of Content </p>
            <div className="overflow-y-scroll h-[300px]">
              <table className="min-w-full table-auto border-collapse">
                <tbody>
                  {blogPackageData?.blogQuestions?.map((item, i) => (
                    <React.Fragment key={i}>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-base cursor-pointer font-semibold">
                          <ScrollLink
                            to={`${item?._id}`}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                          >
                            {item?.title}
                          </ScrollLink>
                        </td>
                      </tr>
                      {item?.blogSubQuestion?.questions?.map((item1, k) => (
                        <tr key={k} className="border-b">
                          <td className="px-4 py-2 ml-6 text-sm font-normal">
                            <ScrollLink
                              to={`${item1?._id}st${k}`}
                              spy={true}
                              smooth={true}
                              offset={-100}
                              duration={500}
                            >
                              <p className="hover:cursor-pointer hover:text-primary">
                                {k + 1}- {item1?.title}
                              </p>
                            </ScrollLink>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Blog content */}
          <div className="bg-white shadow-md px-4 py-4">
            <div id="ItinerarySubSection" className="md:text-base text-sm">
              <p
                dangerouslySetInnerHTML={{
                  __html: blogPackageData?.contentsummary,
                }}
              ></p>
            </div>
            {blogPackageData?.blogQuestions?.map((item, i) => (
              <div key={i} className="pt-3" id={`${item?._id}`}>
                <h3 className="md:text-2xl text-lg font-semibold mb-2">
                  {item?.title}
                </h3>
                <p className="text-base leading-relaxed">
                  <p
                    dangerouslySetInnerHTML={{ __html: item?.information }}
                  ></p>
                </p>
                {item?.blogSubQuestion?.questions?.length > 0 &&
                  item?.blogSubQuestion?.questions?.map((item1, k) => (
                    <div key={k} className="pt-7" id={`${item1?._id}st${k}`}>
                      <h3 className="md:text-xl text-base font-semibold mb-2">
                        {k + 1}. {item1?.title}
                      </h3>
                      <p className="text-base leading-relaxed">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item1?.information,
                          }}
                        ></p>
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Sidebar Table of Content for desktop */}
          <div className="hidden xl:block px-6 text-base">
            <div className="sticky top-24 z-10">
              <BlogSideForm />
              <p className="text-xl pb-6 font-semibold">Table of Content</p>
              <div className="overflow-y-scroll h-[450px]">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>
                    {blogPackageData?.blogQuestions?.map((item, i) => (
                      <React.Fragment key={i}>
                        <tr className="border-b">
                          <td className="px-4 py-2 text-base cursor-pointer font-semibold">
                            <ScrollLink
                              to={`${item?._id}`}
                              spy={true}
                              smooth={true}
                              offset={-100}
                              duration={500}
                            >
                              {item?.title}
                            </ScrollLink>
                          </td>
                        </tr>
                        {item?.blogSubQuestion?.questions?.map((item1, k) => (
                          <tr key={k} className="border-b">
                            <td className="px-4 py-2 ml-6 text-sm font-normal">
                              <ScrollLink
                                to={`${item1?._id}st${k}`}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                              >
                                <p className="hover:cursor-pointer hover:text-primary">
                                  {k + 1}- {item1?.title}
                                </p>
                              </ScrollLink>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Blog */}
      <div>
        <SuggestedBlog filterSuggestedBlogData={filterSuggestedBlogData} />
      </div>
    </div>
  );
};

export default BlogDescription;
