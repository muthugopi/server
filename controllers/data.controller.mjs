export let server_datas = {
    visitors : 0,
    admin_visits : 0,
    accounts : 0,
    logined : 0,
    requests : 0,
    messages : 0
}

export const showData = (req, res) => {
    res.status(200).send(server_datas);
}