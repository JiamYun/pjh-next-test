import DaumPostcodeEmbed from "react-daum-postcode";
import { Frame } from "@/atoms";
import { colors } from "@/styles";

interface AddressLookupProps {
  show: boolean;
  onClose: () => void;
  onComplete: (address: string) => void;
}

const AddressLookup = ({ show, onClose, onComplete }: AddressLookupProps) => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete(fullAddress);
    onClose();
  };

  if (!show) return null;

  return (
    <Frame
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg={colors.white}
      zIndex={9999}
    >
      {/* 헤더 */}
      {/* <Frame row w="100%" h="56px" px={20} alignment="center" bg={colors.white}>
        <Icon
          type="main"
          name="back"
          size={24}
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
      </Frame> */}

      {/* 주소 검색 컴포넌트 */}
      <Frame w="100%" h="calc(100% - 56px)">
        <DaumPostcodeEmbed
          onComplete={handleComplete}
          style={{ width: "100%", height: "100%" }}
          autoClose={false}
        />
      </Frame>
    </Frame>
  );
};

export default AddressLookup;
