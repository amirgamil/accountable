import Link from "next/link";
import styled from "styled-components";

interface Props {
    name: string;
    id: Object;
    accountabilityBuddy: string;
    stakeeAddress: string;
}

const StyledDiv = styled.div`
    border: 1px solid rgb(230, 230, 230);
    border-radius: 24px;

    &:hover {
        border: 2px solid #badafe;
        cursor: grab;
    }
`;

export const StakeField = ({ name, id, accountabilityBuddy, stakeeAddress }: Props) => {
    return (
        <Link href={`/stake?id=${id}`} passHref>
            <StyledDiv className="w-full my-10 p-5">
                <strong>
                    <p>Name</p>
                </strong>
                <p style={{ opacity: 0.5 }}>{name}</p>
                <strong>
                    <p>ID</p>
                </strong>
                <p style={{ opacity: 0.5 }}>{id.toString()}</p>
                <strong>
                    <p>Buddy</p>
                </strong>
                <p style={{ opacity: 0.5 }}>{accountabilityBuddy}</p>
                <strong>
                    <p>Stakee</p>
                </strong>
                <p>
                    <p style={{ opacity: 0.5 }}>{stakeeAddress}</p>
                </p>
            </StyledDiv>
        </Link>
    );
};
