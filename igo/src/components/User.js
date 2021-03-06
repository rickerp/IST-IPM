import React, { Component } from "react";
import { AppContext, AppConsumer } from "../context";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import Profile from "./Profile";
import Popup from "reactjs-popup";

export default class User extends Component {
    state = {
        profile: false,
        openAdd: false
    };

    openAdd() {
        this.setState({ openAdd: true });
    }

    closeAdd() {
        this.setState({ openAdd: false });
    }

    toggleProfile() {
        this.setState({ profile: !this.state.profile });
    }

    openDescription() {
        this.setState({ write: true });
    }

    closeDescription() {
        this.props.keyboardToggle(false);
        this.setState({ write: false });
    }

    render() {
        return (
            <Spring
                from={{ opacity: 0, marginTop: -20 }}
                to={{ opacity: 1, marginTop: 0 }}
            >
                {springProps => (
                    <div style={springProps}>
                        <UserWrapper>
                            <Avatar className="user-avatar">
                                <img
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        borderRadius: "50%"
                                    }}
                                    src={this.props.item.avatar}
                                    alt="User"
                                />
                            </Avatar>
                            <div className="user-name">
                                <NameText>{this.props.item.name}</NameText>
                            </div>
                            <div className="user-description">
                                <DescriptionText>
                                    {this.props.item.description}
                                </DescriptionText>
                            </div>
                            <AppConsumer>
                                {value => (
                                    <>
                                        <UserOptions className="user-options">
                                            {this.props.item.added ? (
                                                <i
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                    className="fas fa-cog"
                                                    onClick={() => {
                                                        this.toggleProfile();
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <i
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        className="fas fa-plus-circle"
                                                        onClick={() => {
                                                            this.openAdd();
                                                        }}
                                                    />
                                                    <Popup
                                                        open={
                                                            this.state.openAdd
                                                        }
                                                        position="top center"
                                                        overlayStyle={{
                                                            width: "230px",
                                                            height: "341px",
                                                            margin: "auto",
                                                            position:
                                                                "absolute",
                                                            top: 30
                                                        }}
                                                        closeOnDocumentClick={
                                                            false
                                                        }
                                                        contentStyle={{
                                                            padding: "2px",
                                                            maxHeight: "300px",
                                                            overflowY: "auto",
                                                            overflowX: "hidden",
                                                            maxWidth: "130px",
                                                            fontSize: "13px",
                                                            border:
                                                                "1px solid black",
                                                            textAlign: "center",
                                                            padding: "15px",
                                                            borderRadius: "20px"
                                                        }}
                                                    >
                                                        Are you sure you want to
                                                        add this person to your
                                                        friends' list?
                                                        <br />
                                                        <ButtonBetter
                                                            onClick={() => {
                                                                this.closeAdd();
                                                                this.openDescription();
                                                            }}
                                                        >
                                                            Yes
                                                        </ButtonBetter>
                                                        <ButtonBetter
                                                            onClick={() =>
                                                                this.closeAdd()
                                                            }
                                                        >
                                                            No
                                                        </ButtonBetter>
                                                    </Popup>
                                                </>
                                            )}
                                        </UserOptions>
                                        <Profile
                                            item={this.props.item}
                                            status={this.state.profile}
                                            onRemove={() =>
                                                value.removeFriend(
                                                    this.props.item.id,
                                                    this.props.item.userId
                                                )
                                            }
                                            keyboardInput={
                                                this.props.keyboardInput
                                            }
                                            keyboardToggle={
                                                this.props.keyboardToggle
                                            }
                                            setInput={this.props.setInput}
                                            selfToggle={() =>
                                                this.toggleProfile()
                                            }
                                        />
                                        <Popup
                                            open={this.state.write}
                                            position="top center"
                                            overlayStyle={{
                                                width: "230px",
                                                height: "341px",
                                                margin: "auto",
                                                position: "absolute",
                                                top: 30
                                            }}
                                            closeOnDocumentClick={false}
                                            contentStyle={{
                                                marginTop: "10px",
                                                padding: "2px",
                                                maxHeight: "300px",
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                                width: "150px",
                                                fontSize: "13px",
                                                border: "1px solid black",
                                                textAlign: "center",
                                                padding: "15px",
                                                borderRadius: "20px"
                                            }}
                                        >
                                            To identify your friend better, add
                                            a description:
                                            <LineInput
                                                style={
                                                    this.state.write
                                                        ? {
                                                              visibility:
                                                                  "visible"
                                                          }
                                                        : {
                                                              visibility:
                                                                  "hidden"
                                                          }
                                                }
                                                type="text"
                                                value={this.props.keyboardInput}
                                                placeholder="Description..."
                                                onClick={
                                                    this.props.keyboardToggle
                                                }
                                            />
                                            <br />
                                            <ButtonBetter
                                                onClick={() => {
                                                    this.closeDescription();
                                                    this.props.onSuccess();
                                                    value.addFriend(
                                                        this.props.item.id,
                                                        this.props.item.userId,
                                                        this.props.keyboardInput
                                                    );
                                                }}
                                            >
                                                Confirm
                                            </ButtonBetter>
                                            <ButtonBetter
                                                onClick={() =>
                                                    this.closeDescription()
                                                }
                                            >
                                                Cancel
                                            </ButtonBetter>
                                        </Popup>
                                    </>
                                )}
                            </AppConsumer>
                        </UserWrapper>
                    </div>
                )}
            </Spring>
        );
    }
}

const LineInput = styled.input`
    width: 100%;
    height: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const UserWrapper = styled.div`
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 40px 1fr 1fr 30px;
    grid-template-rows: 3px 30px 15px 3px;
    grid-template-areas:
        ". . . ."
        "user-avatar user-name user-name user-options"
        "user-avatar user-description user-description user-options"
        ". . . .";

    button {
        margin: 4px;
    }
`;

const Avatar = styled.div`
    margin-right: auto;
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
`;

const NameText = styled.p`
    font-size: 100%;
    font-weight: 700;
    margin-left: 10px;
    margin-top: 5px;
    color: black;
    text-decoration: none;
`;

const DescriptionText = styled.p`
    font-size: 80%;
    margin-left: 10px;
    margin-top: -9px;
    color: black;
    text-decoration: none;
`;

const UserOptions = styled.div`
    display: block;
    margin-right: auto;
    margin-left: 5px;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 90%;
`;

const ButtonBetter = styled.button`
    font-family: "Montserrat";
    font-size: 12px;
    background: transparent;
    border: 1px solid black;
    border-radius: 10px;
`;
