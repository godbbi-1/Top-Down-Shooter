const onError = (socket, err) => {
    console.error('소켓 오류 발생:', err.message);
    socket.destroy(); // 소켓 강제 종료
};

export default onError;
