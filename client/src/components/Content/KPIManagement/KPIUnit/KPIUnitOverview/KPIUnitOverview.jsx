import React, { Component } from 'react';
import { connect } from 'react-redux';
import { kpiUnitActions, departmentActions } from '../../../../../redux-actions/CombineActions';
import { ModalDetailKPI } from './ModalDetailKPI';
import CanvasJSReact from '../../../TaskManagement/Chart/canvasjs.react';
import { ModalCopyKPIUnit } from './ModalCopyKPIUnit';

class KPIUnitOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalCopy: "",
            currentRole: localStorage.getItem("currentRole")
        };
    }
    componentDidMount() {
        this.props.getDepartment(localStorage.getItem('id'));
        this.props.getAllKPIUnit(localStorage.getItem("currentRole"));
        this.handleResizeColumn();
    }
    componentDidUpdate() {
        if (this.state.currentRole !== localStorage.getItem('currentRole')) {
            this.props.getAllKPIUnit(localStorage.getItem("currentRole"));
            this.setState(state => {
                return {
                    ...state,
                    currentRole: localStorage.getItem('currentRole')
                }
            })
        }
    }
    handleResizeColumn = () => {
        window.$(function () {
            var pressed = false;
            var start = undefined;
            var startX, startWidth;

            window.$("table thead tr th:not(:last-child)").mousedown(function (e) {
                start = window.$(this);
                pressed = true;
                startX = e.pageX;
                startWidth = window.$(this).width();
                window.$(start).addClass("resizing");
            });

            window.$(document).mousemove(function (e) {
                if (pressed) {
                    window.$(start).width(startWidth + (e.pageX - startX));
                }
            });

            window.$(document).mouseup(function () {
                if (pressed) {
                    window.$(start).removeClass("resizing");
                    pressed = false;
                }
            });
        });
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, year].join('-');
    }
    showModalCopy = async (id) => {
        await this.setState(state => {
            return {
                ...state,
                showModalCopy: id
            }
        })
        var element = document.getElementsByTagName("BODY")[0];
        element.classList.add("modal-open");
        var modal = document.getElementById(`copyOldKPIToNewTime${id}`);
        modal.classList.add("in");
        modal.style = "display: block; padding-right: 17px;";
    }
    checkPermisson = (deanCurrentUnit) => {
        var currentRole = localStorage.getItem("currentRole");
        return (currentRole === deanCurrentUnit);
    }
    render() {
        var listkpi, currentKPI, currentTargets, kpiApproved, datachat1, targetA, targetC, targetOther, misspoint;
        var unitList, currentUnit;
        const { departments, kpiunits } = this.props;
        if (departments.unitofuser) {
            unitList = departments.unitofuser;
            currentUnit = unitList.filter(item =>
                item.dean === this.state.currentRole
                || item.vice_dean === this.state.currentRole
                || item.employee === this.state.currentRole);
        }
        if (kpiunits.kpis) {
            listkpi = kpiunits.kpis;
            kpiApproved = listkpi.filter(item => item.status === 2);
            currentKPI = listkpi.filter(item => item.status !== 2);
            currentTargets = currentKPI[0].listtarget.map(item => { return { y: item.weight, name: item.name } });
            datachat1 = kpiApproved.map(item => {
                return { label: this.formatDate(item.time), y: item.result }
            }).reverse();
            targetA = kpiApproved.map(item => {
                return { label: this.formatDate(item.time), y: item.listtarget[0].result }
            }).reverse();
            targetC = kpiApproved.map(item => {
                return { label: this.formatDate(item.time), y: item.listtarget[1].result }
            }).reverse();
            targetOther = kpiApproved.map(item => {
                return { label: this.formatDate(item.time), y: (item.result - item.listtarget[0].result - item.listtarget[1].result) }
            }).reverse();
            misspoint = kpiApproved.map(item => {
                return { label: this.formatDate(item.time), y: (100 - item.result) }
            }).reverse();
        }
        const options1 = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Kết quả KPI đơn vị năm 2019",
                fontFamily: "tahoma",
                fontWeight: "normal"
            },
            axisX: {
                title: "Tháng"
            },
            axisY: {
                title: "Điểm",
            },
            data: [{
                type: "line",
                dataPoints: datachat1
            }]
        }
        const options2 = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Biểu đồ kết quả KPI 2019",
                fontFamily: "tahoma",
                fontWeight: "normal"
            },
            axisY: {
                title: "Điểm",
            },
            toolTip: {
                shared: true
            },
            legend: {
                fontSize: 13
            },
            data: [{
                type: "stackedColumn100",
                showInLegend: true,
                name: "Hoàn thành vai trò quản lý (A)",
                dataPoints: targetA
            },
            {
                type: "stackedColumn100",
                showInLegend: true,
                name: "Liên kết nhân viên (C)",
                dataPoints: targetC
            },
            {
                type: "stackedColumn100",
                showInLegend: true,
                name: "Mục tiêu khác",
                dataPoints: targetOther
            },
            {
                type: "stackedColumn100",
                showInLegend: true,
                name: "Điểm bị trừ",
                dataPoints: misspoint
            }]
        }
        const options3 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Phân bố mục tiêu tháng 12",
                fontFamily: "tahoma",
                fontWeight: "normal"
            },
            legend: {
                cursor: "pointer",
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} - {y}%",
                dataPoints: currentTargets
            }]
        }
        return (
            <div className="table-wrapper">
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Tổng quan KPI đơn vị
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="/"><i className="fa fa-dashboard" /> Trang chủ</a></li>
                            <li><a href="/">Quản lý kpi</a></li>
                            <li className="active">Kpi đơn vị</li>
                            <li className="active">Tổng quan kpi đơn vị</li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box box-primary">
                                    <CanvasJSReact options={options2} />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="box box-primary">
                                    <CanvasJSReact options={options1} />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="box box-primary">
                                    <CanvasJSReact options={options3} />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Bảng danh sách kpi đơn vị hàng tháng</h3>
                                    </div>
                                    <div className="box-body">
                                        <table id="example1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th title="Người tạo">Người tạo</th>
                                                    <th title="Thời gian">Thời gian</th>
                                                    <th title="Số lượng mục tiêu">Số lượng mục tiêu</th>
                                                    <th title="Kết quả đánh giá">Kết quả đánh giá</th>
                                                    <th style={this.checkPermisson(currentUnit && currentUnit[0].dean) ? { width: "120px" } : { width: "91px" }}>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (typeof listkpi !== "undefined" && listkpi.length !== 0) ?
                                                        listkpi.map((item, index) =>
                                                            <tr key={index}>
                                                                <td>{item.creater.name}</td>
                                                                <td>{this.formatDate(item.time)}</td>
                                                                <td>{item.listtarget.length}</td>
                                                                <td>{item.result}</td>
                                                                <td>
                                                                    <a href={`#dataResultTask${item._id}`} data-toggle="modal" data-backdrop="static" data-keyboard="false" title="Xem chi tiết KPI tháng này" ><i className="material-icons">view_list</i></a>
                                                                    <ModalDetailKPI kpiunit={item} />
                                                                    {this.checkPermisson(currentUnit && currentUnit[0].dean) && <a href="#abc" onClick={() => this.showModalCopy(item._id)} className="copy" data-toggle="modal" data-backdrop="static" data-keyboard="false" title="Thiết lập kpi tháng mới từ kpi tháng này"><i className="material-icons">content_copy</i></a>}
                                                                    {this.state.showModalCopy === item._id ? <ModalCopyKPIUnit kpiunit={item} /> : null}
                                                                    {this.checkPermisson(currentUnit && currentUnit[0].dean) && item.status === 1 ? <a style={{ color: "navy" }} href="#abc" onClick={() => this.props.refreshData(item._id)} title="Cập nhật kết quả mới nhất của KPI này" ><i className="material-icons">refresh</i></a> : null}
                                                                </td>
                                                            </tr>) : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { departments, kpiunits } = state;
    return { departments, kpiunits };
}

const actionCreators = {
    getDepartment: departmentActions.getDepartmentOfUser,
    getAllKPIUnit: kpiUnitActions.getAllKPIUnit,
    refreshData: kpiUnitActions.evaluateKPIUnit
};
const connectedKPIUnitOverview = connect(mapState, actionCreators)(KPIUnitOverview);
export { connectedKPIUnitOverview as KPIUnitOverview };