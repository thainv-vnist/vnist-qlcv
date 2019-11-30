import React, { Component } from 'react';
import { ModalDetailCourse } from './ModalDetailCourse';

class ListCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "display",
        }
    }
    view = () => {
        this.setState({
            show: ""
        })

    }
    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Chương trình đào tạo bắt buộc
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#abc"><i className="fa fa-dashboard" /> Home</a></li>
                        <li className="active">Quản lý Đào tạo</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="box box-info">
                            <div className="box-body">
                                <div className="col-md-12">
                                    <div className="box-header col-md-12" style={{ paddingLeft: 0 }}>
                                        <h3 className="box-title">Danh sách chương trình đào tạo bắt buộc:</h3>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group col-md-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <label style={{ paddingTop: 5 }}>Đơn vị:</label>
                                        </div>
                                        <div className="form-group col-md-8" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <select className="form-control">
                                                <option>Phòng nhân sự</option>
                                                <option>Phòng hành chính</option>
                                                <option>Phòng kinh doanh</option>
                                                <option>Phòng Marketing</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group col-md-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <label style={{ paddingTop: 5 }}>Chức vụ:</label>
                                        </div>
                                        <div className="form-group col-md-8" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <select className="form-control">
                                                <option>--Tất cả--</option>
                                                <option>Trưởng phòng</option>
                                                <option>Phó trưởng phòng</option>
                                                <option>Nhân viên</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <button type="submit" className="btn btn-success" title="Tìm kiếm" >Tìm kiếm</button>
                                        </div>
                                    </div>
                                    <div className="col-md-3" style={{ paddingRight: 0 }}>
                                        <button type="submit" style={{ marginBottom: 15 }} className="btn btn-success pull-right" id="">Thêm chương trình đào tạo</button>
                                    </div>
                                    <table className="table table-bordered table-hover listcourse">
                                        <thead>
                                            <tr>
                                                <th>Tên chương trình đào tạo</th>
                                                <th>Mã chương trình</th>
                                                <th>Áp dụng cho đơn vị</th>
                                                <th>Áp dụng cho chức vụ</th>
                                                <th style={{ width: "13%" }}>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>An toàn lao động</td>
                                                <td>ITM789</td>
                                                <td>Phòng sản xuất, Phòng kinh doanh</td>
                                                <td>Nhân viên, Phó phòng</td>
                                                <td>
                                                    <center>
                                                        <a href="#view" className="" title="Xem chi tiết chương trình đào tạo" data-toggle="modal" data-target="#modal-viewCourse" style={{ fontSize: 14 }} onClick={() => this.view()}><i className="material-icons">visibility</i></a>
                                                        <a href="#abc" className="edit" title="Chỉnh sửa chương trình đào tạo " ><i className="material-icons"></i></a>
                                                        <a href="#abc" className="delete" title="Xoá chương trình đào tạo" data-toggle="modal" data-target="#modal-viewTrainingPlan"><i className="material-icons"></i></a>
                                                    </center>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Kinh nghiệm làm viêc</td>
                                                <td>ITM789</td>
                                                <td>Phòng hành chính</td>
                                                <td>Nhân viên</td>
                                                <td>
                                                    <center>
                                                        <a href="#view" className="" title="Xem chi tiết chương trình đào tạo" data-toggle="modal" data-target="#modal-viewCourse" style={{ fontSize: 14 }} onClick={() => this.view()}><i className="material-icons">visibility</i></a>
                                                        <a href="#abc" className="edit" title="Chỉnh sửa chương trình đào tạo " ><i className="material-icons"></i></a>
                                                        <a href="#abc" className="delete" title="Xoá chương trình đào tạo" data-toggle="modal" data-target="#modal-viewTrainingPlan"><i className="material-icons"></i></a>
                                                    </center>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Kỹ năng giao tiếp</td>
                                                <td>ITM789</td>
                                                <td>Phòng hành chính</td>
                                                <td>Nhân viên</td>
                                                <td>
                                                    <center>
                                                        <a href="#view" title="Xem chi tiết chương trình đào tạo" data-toggle="modal" data-target="#modal-viewCourse" style={{ fontSize: 14 }} onClick={() => this.view()}><i className="material-icons">visibility</i></a>
                                                        <a href="#abc" className="edit" title="Chỉnh sửa chương trình đào tạo " ><i className="material-icons"></i></a>
                                                        <a href="#abc" className="delete" title="Xoá chương trình đào tạo" data-toggle="modal" data-target="#modal-viewTrainingPlan"><i className="material-icons"></i></a>
                                                    </center>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Kỹ năng đàm phán</td>
                                                <td>ITM789</td>
                                                <td>Phòng marketing</td>
                                                <td>Nhân viên</td>
                                                <td>
                                                    <center>
                                                        <a href="#view" title="Xem chi tiết chương trình đào tạo" data-toggle="modal" data-target="#modal-viewCourse" style={{ fontSize: 14 }} onClick={() => this.view()}><i className="material-icons">visibility</i></a>
                                                        <a href="#abc" className="edit" title="Chỉnh sửa chương trình đào tạo " ><i className="material-icons"></i></a>
                                                        <a href="#abc" className="delete" title="Xoá chương trình đào tạo" data-toggle="modal" data-target="#modal-viewTrainingPlan"><i className="material-icons"></i></a>
                                                    </center>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.box-body */}

                            </div>
                            <div className={this.state.show} id="view">
                                <ModalDetailCourse />
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                </section>
            </div>
        );
    };
};

export { ListCourse };