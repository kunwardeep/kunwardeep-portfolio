import { UserData } from "../../types";
import Image from "next/image";

const Avatar = ({ src }: { src: string }) => {
  return (
    <Image
      priority
      className="rounded-full"
      src={src}
      width={200}
      height={200}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt="Picture of the user"
    />
  );
};

const UserNameDisplay = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  return <h2 className="text-xl font-bold">{`${firstName} ${lastName}`}</h2>;
};

const UserDisplay = ({ name, picture, nat, email }: UserData) => {
  return (
    <div className="bg-white rounded-lg w-[300px] h-[300px] flex flex-col items-center justify-center p-3">
      <Avatar src={picture.large} />
      <UserNameDisplay firstName={name.first} lastName={name.last} />
      <p>{email}</p>
      <p>Nationality: {nat}</p>
    </div>
  );
};

export default UserDisplay;
