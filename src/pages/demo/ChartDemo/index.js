import React from 'react'
import { connect } from 'dva'
import Bar from 'COMPONENT/Chart/Bar';
import BarDodge from 'COMPONENT/Chart/Bar/dodge';

class ChartDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barData: [
                { x: '1952 年', y: 52 },
                { x: '1956 年', y: 61 },
                { x: '1957 年', y: 166 },
                { x: '1958 年', y: 48 },
                { x: '1960 年', y: 38 },
                { x: '1962 年', y: 38 }
            ],
            barDodgeData: [
                { x: 'London', y1: 'Jan.', y2: 18.9 },
                { x: 'London', y1: 'Feb.', y2: 28.8 },
                { x: 'London', y1: 'Mar.', y2: 39.3 },
                { x: 'London', y1: 'Apr.', y2: 81.4 },
                { x: 'London', y1: 'May.', y2: 47 },
                { x: 'London', y1: 'Jun.', y2: 20.3 },
                { x: 'London', y1: 'Jul.', y2: 24 },
                { x: 'London', y1: 'Aug.', y2: 35.6 },
                { x: 'Berlin', y1: 'Jan.', y2: 12.4 },
                { x: 'Berlin', y1: 'Feb.', y2: 23.2 },
                { x: 'Berlin', y1: 'Mar.', y2: 34.5 },
                { x: 'Berlin', y1: 'Apr.', y2: 99.7 },
                { x: 'Berlin', y1: 'May.', y2: 52.6 },
                { x: 'Berlin', y1: 'Jun.', y2: 35.5 },
                { x: 'Berlin', y1: 'Jul.', y2: 37.4 },
                { x: 'Berlin', y1: 'Aug.', y2: 42.4 }
            ]
        };

        this.drawChart = this.drawChart.bind(this);
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        setTimeout(() => {
            this.setState({
                barData: [
                    { x: '1952 年', y: 52 },
                    { x: '1956 年', y: 61 },
                    { x: '1957 年', y: 166 },
                    { x: '1958 年', y: 48 },
                    { x: '1960 年', y: 38 },
                    { x: '1962 年', y: 38 },
                    { x: '1988 年', y: 64 }
                ]
            })
        }, 4000);
    }

    render() {
        let {barData, barDodgeData} = this.state;

        return (
            <div>
                <div>
                    <Bar
                        data={barData}
                        height={300}
                        padding={30}
                    />
                </div>

                <div>
                    <BarDodge
                        data={barDodgeData}
                        // width={360} // 不设置宽度则宽度自适应父容器
                        height={360} // 设置高度
                        padding={30} // 可传入padding
                        // configs={{}} // 需要传入给chart的一些配置
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.account;

    return {
        user
    }
}

export default connect(mapStateToProps)(ChartDemo)
