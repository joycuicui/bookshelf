const MySettings = () => {
  return (
    <div>
      <h1 className="text-gray-600 font-semibold text-xl">
        Email Reminder Preferences
      </h1>

      <div className="mx-12 my-8">
        <span>Current Frequency:</span>
        <span className="ml-4">Every Day</span>
      </div>

      <div className="mx-12 flex flex-col  gap-3">
        <h4>Email Me Every ...</h4>
        <form className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="monday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="monday" className="cursor-pointer">
              Monday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="tuesday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="tuesday" className="cursor-pointer">
              Tuesday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="wednesday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="wednesday" className="cursor-pointer">
              Wednesday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="thursday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="thursday" className="cursor-pointer">
              Thursday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="friday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="friday" className="cursor-pointer">
              Friday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="saturday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="saturday" className="cursor-pointer">
              Saturday
            </label>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="sunday"
              className="cursor-pointer w-4 h-4"
            />
            <label htmlFor="sunday" className="cursor-pointer">
              Sunday
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MySettings;
