import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { colors } from '../constants/constants';


    
const MasterPieChart = ({ stat }) => {

    let data_1;
    let data_2;
    data_1 = [
        { name: "Matches Won", value: stat.match_win, color: colors.auraGreen },
        { name: "Matches Lost", value: stat.match_lost, color: colors.auraRed},
    ]
    data_2 = [
        { name: "Games Won", value: stat.game_win, color: colors.frostBlueDark},
        { name: "Games Lost", value: stat.game_lost, color: colors.auraOrange},
    ]
    
    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length){
            return(
                <div style={{
                    width: "fit-content",
                    height: "fit-content",
                    background: colors.secondDark,
                    color: colors.darkGrey,
                    border: `0.5px solid ${colors.darkGrey}`,
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "13px"
                }}>
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            )
        }
        return null
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill={colors.secondDark} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
    };


    return (
        <div style={{width:"100%", height: "300px"}}>
    
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data_1}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        outerRadius={80}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {data_1.map(item => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>
                    
                    <Pie
                        dataKey="value"
                        data={data_2}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={360}
                        outerRadius={80}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {data_2.map(item => (
                            <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>

                    <Legend iconSize={12} iconType="circle" />
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MasterPieChart;