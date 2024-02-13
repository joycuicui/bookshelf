const About = () => {
  return (
    <div>
      <h1 className="text-green-800 font-semibold text-xl p-8">About Us</h1>

      <div className="flex flex-row">
        <div className="container p-6 border-gray-300 max-w-md h-auto mb-4">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div>
              <img
                src={"/default-cover-image.png"}
                alt="Profile"
                className="w-50 h-80 rounded-full"
              />
              <p>My Name is Bilqis Ahmed </p>
              <a href="https://github.com/bahmed32"  style={{ color: 'blue' }}> GitHub: bahmed32 </a>
              <a href="mailto:bilqis.ali32@gmail.com"  style={{ color: 'pink' }}> Email </a>
              <p>Fun Fact:"I can tell where the coffee beans were sourced from just by tasting it ."</p>
            </div>
          </div>
        </div>


        <div className="container p-6 border-gray-300 max-w-md h-auto mb-4">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div>
              <img
                src={"/default-cover-image.png"}
                alt="Profile"
                className="w-50 h-80 rounded-full"
              />
              <p>My Name is "Your Name"</p>
              <p>GitHub: </p>
              <p>Email: </p>
              <p>Fun Fact:"At vero eos et accusamus atque corrupti ,  Nam libero tempore, cum soluta nobis est eligendi ."</p>
            </div>
          </div>
        </div>

        <div className="container p-6 border-gray-300 max-w-md h-auto">
          <div className="ml-2 mt-8 flex gap-2 border border-gray-300 rounded-lg shadow justify-between p-6 items-center">
            <div className="justify-center">
              <img
                src={"/default-cover-image.png"}
                alt="Profile"
                className="w-50 h-80 rounded-full"
              />
              <p>My Name is "Your Name"</p>
              <p>GitHub: </p>
              <p>Email: </p>
              <p>Fun Fact:"At vero eos et accusamus atque corrupti ,  Nam libero tempore, cum soluta nobis est eligendi ."</p>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <h1 className="text-green-800 font-semibold text-xl p-8">About The Project</h1>
      <div className="w-30 flex border border-gray-300 rounded-lg shadow justify-between p-5 items-center">
        <p>"At vero eos et accusamus atque corrupti , id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
      </div>
    </div >
  );
};

export default About;
