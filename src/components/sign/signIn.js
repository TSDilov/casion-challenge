import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '../../translations/translate'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { connectWallet } from '../../utils/wallet'
import { setWalletAddress } from '../../reducers/wallet'

function SignIn(props) {
    const { lang } = props
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const walletAddress = useSelector(state => state.wallet.address)

    function handleChange(type, e) {
        switch (type) {
            case "user":
                setUser(e.target.value)
                break
            case "pass":
                setPass(e.target.value)
                break
            default:
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!user && !pass) {
            connectWallet()
                .then(walletAddress => {
                    dispatch(setWalletAddress(walletAddress))
                    console.log("✅ Wallet connected:", walletAddress)
                })
                .catch(err => {
                    console.error("❌ Wallet connection failed:", err.message)
                })
            return
        }

        if (typeof props.signSubmit === "function") {
            props.signSubmit({ emit: 'signin_send', payload: { user, pass } })
        }
    }

    function handleVisible() {
        setVisible(!visible)
    }

    return <div className="sign_in_container">
        <Form>
            <Row>
                <Col sm={4} className="label_container d-none d-sm-block">
                    <div className="label">{translate({ lang: lang, info: "user" })}</div>
                </Col>
                <Col sm={8} className="input_container">
                    <input placeholder={translate({ lang: lang, info: "user" })} className="input_light" type="text" value={user} onChange={(e) => { handleChange('user', e) }} />
                </Col>
            </Row>
            <Row>
                <Col sm={4} className="label_container d-none d-sm-block">
                    <div className="label">{translate({ lang: lang, info: "password" })}</div>
                </Col>
                <Col sm={8} className="input_container">
                    <input placeholder={translate({ lang: lang, info: "password" })} className="input_light" type={visible ? "text" : "password"} value={pass} onChange={(e) => { handleChange('pass', e) }} />
                    <div className="input_eye" onClick={() => handleVisible()}>
                        {visible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="button" onClick={(e) => handleSubmit(e)} className="mybutton button_fullcolor">
                        {translate({ lang: lang, info: "sign_in" })}
                    </Button>
                    {walletAddress && (
                        <p style={{ color: '#ffd700', fontSize: '0.9em', marginTop: '8px', textAlign: 'center' }}>
                            Connected: {walletAddress}
                        </p>
                    )}
                </Col>
            </Row>
        </Form>
    </div>
}

export default SignIn