<template>
  <Head>
    <Title>Create Ticket</Title>
  </Head>
  <main class="container">
    <div class="columns">
      <SideNav/>
      <div class="column is-9">
        <NavTree/>
        <form method="post" class="is-flex is-justify-content-center is-align-items-flex-start"
              @submit.prevent="createNewTicket">
          <div class="column">
            <div class="field">
              <label class="label">Reference</label>
              <div class="control">
                <input class="input" type="text" placeholder="Transaction Code or Ref Number"
                       name="reference" v-model="reference">
                <p class="help is-info">Required</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Safaricom Phone Number</label>
              <div class="control">
                <input class="input" type="text" inputmode="number" required name="safaricom_no"
                       v-model="safaricom_no">
              </div>
              <p class="help is-info">Required</p>
            </div>

            <div class="field">
              <label class="label">Airtel Phone Number</label>
              <div class="control">
                <input class="input" type="text" inputmode="number" required name="airtel_no"
                       v-model="airtel_no">
              </div>
              <p class="help is-info">Required</p>
            </div>

            <div class="field">
              <label class="label">Amount</label>
              <div class="control">
                <input class="input" type="number" name="amount" required v-model="amount">
                <p class="help is-info">Required</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Sender Name or Identifier" name="name"
                       v-model="name">
                <p class="help is-success">Optional</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Issue</label>
              <div class="control">
                <div class="select">
                  <select name="issue" v-model="issue">
                    <option value="EA">Excess Airtime</option>
                    <option value="BWN">Buying To Wrong Number</option>
                    <option value="NC">Not Credited</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
              <p class="help is-success">Optional</p>
            </div>

            <div class="field">
              <label class="label">Company</label>
              <div class="control">
                <div class="select">
                  <select name="company" v-model="company">
                    <option value="safaricom">Safaricom</option>
                    <option value="airtel">Airtel</option>
                    <option value="leizam">Leizam Ventures</option>
                  </select>
                </div>
              </div>
              <p class="help is-success">Optional</p>
            </div>

            <div class="field">
              <label class="label">Paybill</label>
              <div class="control">
                <div class="select">
                  <select name="paybill_no" required v-model="paybill_no">
                    <option v-for="(paybill, index) in paybills" :key="index" :value="paybill">
                      {{ paybill }}
                    </option>
                  </select>
                </div>
              </div>
              <p class="help is-success">Optional</p>
            </div>
          </div>

          <div class="column">
            <label class="label">Transaction Date</label>
            <div class="control">
              <input class="input" type="date" name="transaction_date" v-model="transaction_date">
              <p class="help is-success">Default is today</p>
            </div>

            <div class="field mt-3">
              <label class="label">Additional Info</label>
              <div class="control">
                                <textarea class="textarea" placeholder="Anything You Think We Should Know?" rows="1"
                                          name="a_info" v-model="a_info"></textarea>
              </div>
              <p class="help is-success">Optional</p>
            </div>

            <div class="field">
              <label class="label">Elevation</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="urgency" value="urgent" v-model="urgency">
                  Urgent
                </label>
                <label class="radio">
                  <input type="radio" name="urgency" value="emergency" v-model="urgency">
                  Emergency
                </label>
              </div>
              <p class="help is-success">Optional</p>
            </div>

            <div class="field is-grouped mt-6">
              <div class="control">
                <button class="button is-link" type="submit">Submit</button>
              </div>
              <div class="control">
                <button class="button is-link is-light" type="reset">Cancel</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
const {data} = await useFetch('/api/paybills')
const paybills = data.value.map((obj) => {
  return obj.number
})
</script>
<script>
export default {
  data() {
    return {
      safaricom_no: '',
      airtel_no: '',
      amount: '',
      name: '',
      issue: '',
      company: '',
      paybill_no: '',
      transaction_date: '',
      a_info: '',
      urgency: '',
      reference: ''
    }
  },
  mounted() {
    this.transaction_date = new Date().toISOString().split('T')[0]
  },
  methods: {
    async createNewTicket() {
      const ticket = {
        safaricom_no: this.safaricom_no,
        airtel_no: this.airtel_no,
        amount: this.amount,
        name: this.name,
        issue: this.issue,
        company: this.company,
        paybill_no: this.paybill_no,
        transaction_date: this.transaction_date,
        a_info: this.a_info,
        urgency: this.urgency,
        reference: this.reference
      }

      console.log(ticket)

      const {data: response} = await useFetch('/api/tickets/create', {
        method: 'POST',
        body: ticket,
      }).catch((err) => {
        console.log(err)
        alert(err)
      })

      if (response.value.statusCode === 200) {
        this.$router.push('/tickets')
        alert(`Ticket ${response.value.id} Created Successfully`)
      } else {
        alert(response.value.status + " " + response.value.message)
      }
    }
  }
}
</script>

<style scoped></style>