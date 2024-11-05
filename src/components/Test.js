import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [method, setMethod] = useState("POST");
    const [route, setRoute] = useState(""); // 라우트 주소 상태
    const [header, setHeader] = useState(""); // 헤더 정의 JSON 문자열
    const [body, setBody] = useState(""); // 바디 정의 JSON 문자열
    const [showModal, setShowModal] = useState(false);
    const [response, setResponse] = useState(""); // API 응답 데이터

    const hmethod = (e) => {
        setMethod(e.target.value);
    };

    const handleSend = async () => {
        try {
            // JSON 파싱
            const parsedHeader = header ? JSON.parse(header) : {};
            const parsedBody = body ? JSON.parse(body) : {};

            // 요청 옵션 설정
            const config = {
                headers: parsedHeader, // 파싱된 JSON 객체로 설정
            };

            // HTTP 메소드에 따른 요청 수행
            let res;
            if (method === "GET") {
                res = await axios.get(route, config);
            } else if (method === "POST") {
                res = await axios.post(route, parsedBody, config);
            } else if (method === "PUT") {
                res = await axios.put(route, parsedBody, config);
            } else if (method === "DELETE") {
                res = await axios.delete(route, config);
            } else if (method === "UPDATE") {
                res = await axios.patch(route, parsedBody, config); // PATCH 메소드로 처리
            }

            // 응답 데이터를 상태에 저장하여 모달에서 표시
            setResponse(JSON.stringify(res.data, null, 2)); // JSON 포맷으로 응답 데이터 저장
            setShowModal(true); // 모달 열기
        } catch (error) {
            // JSON 파싱 오류 또는 요청 오류 처리
            setResponse(`Error: ${error.message}`);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false); // 모달 닫기
    };

    useEffect(() => {
        console.log(method);
    }, [method]);

    return (
        <div className="p-4">
            <h1 className="HomeText">API 테스트</h1>

            <div className="mb-3">
                <label className="pe-2">라우트 주소</label>
                <input
                    type="text"
                    placeholder="라우트주소"
                    className="form-control"
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                    onChange={(e) => setRoute(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="pe-2 d-block">HTTP 메소드 선택</label>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="httpMethod"
                        id="getMethod"
                        value="GET"
                        onChange={hmethod}
                    />
                    <label className="form-check-label" htmlFor="getMethod">GET</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="httpMethod"
                        id="postMethod"
                        value="POST"
                        onChange={hmethod}
                    />
                    <label className="form-check-label" htmlFor="postMethod">POST</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="httpMethod"
                        id="putMethod"
                        value="PUT"
                        onChange={hmethod}
                    />
                    <label className="form-check-label" htmlFor="putMethod">PUT</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="httpMethod"
                        id="deleteMethod"
                        value="DELETE"
                        onChange={hmethod}
                    />
                    <label className="form-check-label" htmlFor="deleteMethod">DELETE</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="httpMethod"
                        id="updateMethod"
                        value="UPDATE"
                        onChange={hmethod}
                    />
                    <label className="form-check-label" htmlFor="updateMethod">UPDATE</label>
                </div>
            </div>

            <div className="mb-3">
                <label className="pe-2">헤더 정의 (JSON)</label>
                <textarea
                    placeholder='{"key": "value"}'
                    className="form-control"
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        height: "100px",
                    }}
                    onChange={(e) => setHeader(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="pe-2">몸체 정의 (JSON)</label>
                <textarea
                    placeholder='{"key": "value"}'
                    className="form-control"
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        height: "400px",
                    }}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>

            <button
                onClick={handleSend}
                style={{
                    width: "100%",
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                전송
            </button>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "5px",
                            width: "80%",
                            maxWidth: "500px",
                        }}
                    >
                        <h2>응답 결과</h2>
                        <pre>{response}</pre>
                        <button
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                padding: "10px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                                marginTop: "10px",
                                width: "100%",
                            }}
                            onClick={closeModal}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Test;