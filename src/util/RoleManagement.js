const isAdmin = (role) => {
    let roleSplit = role.split(",");
    if(roleSplit.includes("1")){
        return true;
    }else{
        return false;
    }
}

const RoleManagement = {
    isAdmin
}

export default RoleManagement;