// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccnationByage = props => {
  const {vaccineByAgeList} = props
  console.log(vaccineByAgeList)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccineByAgeList}
          startAngle={0}
          endAngle={360}
          innerRadius="0"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill=" #5a8dee" />
          <Cell name="44-60" fill=" #a3df9f" />
          <Cell name="above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default VaccnationByage
