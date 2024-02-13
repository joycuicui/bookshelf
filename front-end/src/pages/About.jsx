const About = () => {
  return (
    <div>
      <h1 className="text-green-800 font-semibold text-xl p-8">About Us</h1>

      <div className="flex flex-row justify-center space-evenly">
        <div className="container p-6 border-gray-300 max-w-md h-auto mb-4">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div>
              <div className="flex justify-center mb-4">
                <img
                  src="/picture_about_bilqis.png"
                  alt="Profile"
                  className="w-50 h-80 rounded-full"
                />
              </div>
              <p>My Name is Bilqis Ahmed</p>
              <a href="https://github.com/bahmed32" style={{ color: 'green' }}>GitHub: bahmed32</a>
              <br />
              <a href="mailto:bilqis.ali32@gmail.com" style={{ color: 'teal' }}>Email: bilqis.ali32@gmail.com</a>
              <p>Fun Fact: I can tell what part of the world a coffee is from just by tasting it.</p>
            </div>
          </div>
        </div>


        <div className="container p-6 border-gray-300 max-w-md h-auto mb-4">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div>
              <div className="flex justify-center mb-4">
                <img
                  src={"/default-cover-image.png"}
                  alt="Profile"
                  className="w-50 h-80 rounded-full"
                />
              </div>
              <p>My Name is Joy Cui</p>
              <a href="https://github.com/joycuicui" style={{ color: 'Green' }}>GitHub: joycuicui</a>
              <br />
              <a href="mailto:cuiqijoy@outlook.com" style={{ color: 'Teal' }}>Email: cuiqijoy@outlook.com</a>
              <p>Fun Fact:"At vero eos et accusamus atque corrupti ,  Nam libero tempore, cum soluta nobis est eligendi ."</p>
            </div>
          </div>
        </div>


        <div className="container p-6 border-gray-300 max-w-md h-auto mb-4">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div>
              <div className="flex justify-center mb-4">
                <img
                  src={"/default-cover-image.png"}
                  alt="Profile"
                  className="w-50 h-80 rounded-full"
                />
              </div>
              <p>My Name is Christel Quiambao</p>
              <a href="https://github.com/c22quiambao" style={{ color: 'Green' }}>GitHub: c22quiambao</a>
              <br />
              <a href="mailto:christelquiambao@gmail.com" style={{ color: 'Teal' }}>Email: christelquiambao@gmail.com</a>
              <p>Fun Fact:"At vero eos et accusamus atque corrupti ,  Nam libero tempore, cum soluta nobis est eligendi ."</p>
            </div>
          </div>
        </div>

      </div>
      <h1 className="text-green-800 font-semibold text-xl p-8">About The Project</h1>
      <div className="w-30 flex border border-gray-300 rounded-lg shadow justify-between p-5 items-center">
      <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
        <p>Introducing Book Haven, your personalized virtual bookshelf designed to enhance your reading journey! With Book Haven, you can effortlessly track your reading progress, share insightful reviews, and stay motivated to finish every book you start.

          Immerse yourself in the joy of reading with our intuitive progress bar, which dynamically updates as you flip through pages, keeping you engaged and on track. Celebrate your literary achievements with star badges upon completion, a testament to your dedication and love for literature.

          Never miss a beat with our convenient reminders and notifications, delivered straight to your inbox or through in-app messages, ensuring you never lose sight of your reading goals.

          Join Book Haven today and unlock the ultimate reading experience, where every page turned brings you closer to literary fulfillment.</p>
          </div>
      </div>
    </div >
  );
};

export default About;
