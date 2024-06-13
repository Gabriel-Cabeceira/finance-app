import { Box, Progress, Tooltip } from "@chakra-ui/react";
import { Marker } from "./progressWithMaker.styles";

const ProgressWithMarker = ({ value, limit }) => {

    return (
        <Box position="relative" width="100%">
            <Tooltip label={`${value.toFixed(2)}%`}>
                <Progress
                    value={value}
                    colorScheme={value > limit ? "red" : "green"}
                />
            </Tooltip>

            <Tooltip label={`Limte: ${limit.toFixed(2)}%`}>
                <Marker position={limit} />
            </Tooltip>
            
        </Box>
    );
};

export default ProgressWithMarker;
