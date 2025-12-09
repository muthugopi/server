export const server_datas = {
    visitors : 0,
    admin_visits : 0,
    accounts : 0,
    logined : 0,
    requests : 0
}

export const showData = (req, res) => {
    res.send(server_datas);
}