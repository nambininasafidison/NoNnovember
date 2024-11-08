import { AvatarPickerProps } from "@/utils/Type";
import React, { useState } from "react";

const AvatarPicker: React.FC<AvatarPickerProps> = ({ avatars, onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined
  );

  const handleSelectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sélectionnez un avatar</h2>

      <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-52 p-2">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            onClick={() => handleSelectAvatar(avatar)}
            className={`w-20 h-20 rounded-full cursor-pointer border-2 transition duration-200 ease-in-out ${
              selectedAvatar === avatar ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;
