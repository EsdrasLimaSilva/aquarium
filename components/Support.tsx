import { RiEmotionHappyFill } from "react-icons/ri";

function Support() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-medium">
      <p className="w-72 text-justify">
        Hey! I'm glad to see you here. If you would like to support me you can
        do it by donating through Paypal or PIX (if you live in Brazil):
        <strong className="bg-orange-600 px-2 mx-2">
          esdraslimasilva83@gmail.com
        </strong>
      </p>

      <p className="w-72 text-justify mt-10">
        But, you don't have to do that, I appreciate your attention and wish you
        good luck! <RiEmotionHappyFill />
      </p>
    </div>
  );
}

export default Support;
