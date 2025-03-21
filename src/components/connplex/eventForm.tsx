"use client";
import Button from "../button/button";
import EnvForm from "./_form";
import styles from "./styles.module.css";

interface FormProps {
  classNames?: string;
  pageForm?: string;
  setRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm: React.FC<FormProps> = ({
  classNames,
  pageForm,
  setRegistering,
}) => {
  return (
    <>
      <section
        className={`border-t border-[#D3B15F] justify-center items-center bg-black py-2 lg:sticky lg:bottom-0 ${styles.eventForm} hidden lg:flex`}
      >
        <EnvForm pageFrom={pageForm} />
      </section>

      <section
        className={`${styles.eventForm} sticky bottom-0 block lg:hidden`}
      >
        <Button
          type="button"
          variant="highlighted"
          className={`w-full flex items-center justify-center text-base font-semibold !text-black !bg-[#D3B15F] !h-[50px] !rounded-[0px]`}
          onClick={() => setRegistering(true)}
        >
          <a href="#mobileForm">Get Started</a>
          <svg
            className={`ml-2 xl:ml-2`}
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
              fill="black"
            />
          </svg>
        </Button>
      </section>
    </>
  );
};

export default EventForm;
