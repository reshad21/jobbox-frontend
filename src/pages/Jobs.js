import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/api/apiSlice";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  // const { position } = data?.data || {}
  console.log(data);
  return (
    <div className='pt-14 max-w-7xl mx-auto'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {/* <JobCard /> */}
        {
          (data?.data?.length > 0)
            ?
            data?.data?.map((jobData) => <JobCard jobData={jobData} key={jobData?._id} />)
            :
            <p>No data found</p>
        }

      </div>
    </div>
  );
};

export default Jobs;
