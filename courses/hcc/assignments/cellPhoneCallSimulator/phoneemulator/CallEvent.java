package phoneemulator;
import java.awt.AWTEvent;

/**
 * 
 * CallEvents are used to communicate actions such
 * as calling a target phone, or reciving a call etc
 * 
 * CallEvents may be constructed using one of 3 ID's
 * 
 * BEGIN  is used dial a phone number <br>
 * ACCEPT is used to accept an incoming call<br>
 * END 	  is used to terminate an incoming call<br>
 * 
 * All CallEvents must contain a to phone number and
 * a from phone number. <br>
 * 
 * The to phone number is who the CallEvent is to
 * and the from phone number is who the CallEvent is from.<br>
 * 
 * The src object must also be set, this is usually
 * the Phone which the event originated from. Passing null 
 * might be ok, though it may possibly lead to null pointer
 * exceptions. To be safe always pass a valid Object.<br>
 * 
 * @author Daniel J. Caruso
 * 
 *
 *

 * 
 */
public class CallEvent extends AWTEvent{
	
	
	//incoming events
	public static final int BEGIN	= 1001; 
    public static final int ACCEPT	= 1002;
    public static final int END		= 1003;
   
	private String from;
	private String to;
	
	/*public CallEvent(Object src, int id)
	{
		super(src, id);
	}
	*/
	public CallEvent(Object src, int id, String to, String from)
	{
		super(src, id);
		this.from = from;
		this.to = to;
	}
	

	/**
	 * Returns the string represntation of 
	 * the phone number of the phone sending the event.
	 * @return String
	 */
	public String getFrom()
	{
		return from;
	}

	/**
	 * Returns the string representation of 
	 * the phone number of the destination phone
	 * @return String
	 */
	public String getTo()
	{
		return to;
	}

	/**
	 * Sets the phone number sending the call event
	 * @param from The from to set
	 */
	public void setFrom(String from)
	{
		this.from = from;
	}

	/**
	 * Sets the phone number we are sending the call event to
	 * @param to The to to set
	 */
	public void setTo(String to)
	{
		this.to = to;
	}

}
