import React, { useContext } from "react";
import { AppContext } from "../context";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";

export default function RouteViewer(props) {
    const value = useContext(AppContext);

    return (
        <>
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 100, duration: 900 }}
            >
                {styledProps => (
                    <MapsWrapper style={styledProps}>
                        <div className="maps-image">
                            {value.state.blind ? (
                                <img
                                    src={
                                        props.location.state.route +
                                        "_blind.png"
                                    }
                                    alt={props.location.state.name}
                                    draggable="false"
                                />
                            ) : (
                                <img
                                    src={props.location.state.route + ".png"}
                                    alt={props.location.state.name}
                                    draggable="false"
                                />
                            )}
                        </div>
                        <div className="maps-blind">
                            <i
                                class="far fa-eye"
                                onClick={() => value.toggleBlind()}
                            />
                        </div>
                    </MapsWrapper>
                )}
            </Spring>
        </>
    );
}

const MapsWrapper = styled.div`
    position: fixed;
    margin-top: -9px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 30px;
    grid-template-areas:
        "maps-image maps-image maps-image maps-image"
        "maps-blind maps-blind maps-blind maps-blind";
`;
