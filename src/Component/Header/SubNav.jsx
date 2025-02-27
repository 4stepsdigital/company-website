import React from "react";

const SubNav = () => {
  return (
    // <div>
    //   <div className="flex flex-col gap-0 sticky top-0 z-40">
    //     <div className="bg-heading pt-[3px]  md:h-[40px] h-5">
    //       <div className="flex items-center   container-wrapper justify-center gap-5">
    //         <p className=" capitalize md:pt[0] pt-[2px] text-white md:text-xs text-[10px]">
    //           call us for free now
    //         </p>
    //         <div className="flex justify-center items-center gap-1 rounded-[17px] bg-navyblack text-white rounded-badge text-xxs md:text-xs px-4 md:py-0  md:mt-[2px]  mt-[2.5px]">
    //           <span className=" text-center justify-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="12"
    //               height="12"
    //               fill="currentColor"
    //               class="bi bi-telephone"
    //               viewBox="0 0 16 16"
    //             >
    //               <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
    //             </svg>
    //           </span>
    //           <span className="text-[10px] md:text-xs">+ 44 20 8068-5634</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col gap-0 sticky top-0 z-40 w-full">
        <div className="bg-heading pt-[3px] md:h-[40px] h-5 flex justify-center items-center w-full">
          <div className="flex items-center justify-center gap-5 container-wrapper">
            <p className="capitalize md:pt-[0] pt-[2px] text-white md:text-xs text-[10px]">
              call us for free now
            </p>
            <div className="flex justify-center items-center gap-1 rounded-[17px] bg-navyblack text-white rounded-badge text-xxs md:text-xs px-4 md:py-0 mt-[2.5px]">
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
              </span>
              <span className="text-[10px] md:text-xs">+ 44 20 8068-5634</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
